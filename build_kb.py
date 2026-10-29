import json
S={
"cv":("JKc66/CircuitVision","https://github.com/JKc66/CircuitVision"),
"i2s":("s39674/Image2schematic","https://github.com/s39674/Image2schematic"),
"pcd":("s39674/PCB-Component-Detection","https://github.com/s39674/PCB-Component-Detection"),
"pd":("SanderGi/PCB-Detection","https://github.com/SanderGi/PCB-Detection"),
"nl":("NYCU-AI-EDA/Netlistify","https://github.com/NYCU-AI-EDA/Netlistify"),
"yolo":("Ultralytics YOLO docs","https://docs.ultralytics.com/"),
"sam":("Segment Anything (Meta)","https://github.com/facebookresearch/segment-anything"),
"ocr":("EasyOCR","https://github.com/JaidedAI/EasyOCR"),
"ngs":("ngspice docs","https://ngspice.sourceforge.io/docs.html"),
"nal":("NetAutLabs","https://github.com/NetAutLabs/netautlabs"),
"clab":("Containerlab docs","https://containerlab.dev/"),
"netlab":("netlab docs","https://netlab.tools/"),
"npb":("CiscoDevNet/netprog_basics","https://github.com/CiscoDevNet/netprog_basics"),
"devnet":("Cisco DevNet Learning Labs","https://developer.cisco.com/learning/"),
"nm":("Netmiko docs","https://ktbyers.github.io/netmiko/"),
"nmgh":("ktbyers/netmiko","https://github.com/ktbyers/netmiko"),
"awe":("awesome-network-automation","https://github.com/networktocode/awesome-network-automation"),
"ans":("Ansible docs","https://docs.ansible.com/"),
"ansios":("Ansible cisco.ios collection","https://docs.ansible.com/ansible/latest/collections/cisco/ios/index.html"),
"nor":("Nornir docs","https://nornir.readthedocs.io/"),
"nap":("NAPALM docs","https://napalm.readthedocs.io/"),
"nc":("RFC 6241 NETCONF","https://datatracker.ietf.org/doc/html/rfc6241"),
"rc":("RFC 8040 RESTCONF","https://datatracker.ietf.org/doc/html/rfc8040"),
}
S.update({
"r1918":("RFC 1918 private addressing","https://www.rfc-editor.org/rfc/rfc1918"),
"r4632":("RFC 4632 CIDR","https://www.rfc-editor.org/rfc/rfc4632"),
"r3021":("RFC 3021 /31 links","https://www.rfc-editor.org/rfc/rfc3021"),
"r4271":("RFC 4271 BGP-4","https://www.rfc-editor.org/rfc/rfc4271"),
"r2328":("RFC 2328 OSPFv2","https://www.rfc-editor.org/rfc/rfc2328"),
"r4364":("RFC 4364 BGP/MPLS IP VPNs","https://www.rfc-editor.org/rfc/rfc4364"),
"r2544":("RFC 2544 benchmarking","https://www.rfc-editor.org/rfc/rfc2544"),
"y1564":("ITU-T Y.1564","https://www.itu.int/rec/T-REC-Y.1564"),
"r6349":("RFC 6349 TCP throughput testing","https://www.rfc-editor.org/rfc/rfc6349"),
"mef":("MEF","https://www.mef.net/"),
"nbc":("NetBox circuits docs","https://docs.netbox.dev/en/stable/features/circuits/"),
"nbcm":("NetBox circuit model","https://docs.netbox.dev/en/stable/models/circuits/circuit/"),
"nbct":("NetBox circuit terminations","https://docs.netbox.dev/en/stable/models/circuits/circuittermination/"),
"nbdemo":("NetBox public demo","https://demo.netbox.dev/"),
"cvp":("CircuitVision products","https://www.circuitvision.com/products/"),
"cvn":("CircuitVision cvNetwork","https://www.circuitvision.com/products/cvnetwork/"),
"cvf":("CircuitVision cvFiber","https://www.circuitvision.com/products/cvfiber/"),
"cvt":("CircuitVision cvTicket","https://www.circuitvision.com/products/cvticket/"),
"tk":("NetOps Starter toolkit","#toolkit"),
"oss":("NetOps Starter: Circuits & OSS 101","#circuits"),
"jdoc":("Juniper documentation","https://www.juniper.net/documentation/"),
})
O="oss"
E=[]
def a(t,q,k,ans,src): E.append({"track":t,"q":q,"k":k,"a":ans,"src":[{"t":S[s][0],"u":S[s][1]} for s in src]})
C="circuit";N="network"
# Circuit vision
a(C,"What is circuit vision?","definition overview image schematic pcb","Using computer vision to turn a photo or drawing of a circuit (schematic or PCB) into structured data: detected components, connections, a netlist, or SPICE input.",["cv","i2s"])
a(C,"Where should I start learning circuit vision?","beginner start first","Start with JKc66/CircuitVision (upload an image, see detected parts and a netlist), then study Image2schematic for the full pipeline, then the PCB detection repos, and Netlistify for SPICE-quality output.",["cv","i2s","nl"])
a(C,"What does JKc66/CircuitVision do?","circuitvision streamlit app","It is a Streamlit app: you upload a circuit image, it detects components and builds a netlist. Good for a quick hands-on demo. Check its README for install steps.",["cv"])
a(C,"What is Netlistify?","netlistify spice schematic","A research project from NYCU AI-EDA that converts schematic images into netlists/SPICE. Use it when you need simulation-oriented output. See the repo README for models and setup.",["nl"])
a(C,"What is Image2schematic?","pcb photo schematic pipeline","A project that goes from a PCB photo toward a schematic, showing the steps: preprocessing, component detection, and trace/connection reconstruction.",["i2s"])
a(C,"Which repo detects components on a PCB photo?","pcb detection components board","Look at s39674/PCB-Component-Detection and SanderGi/PCB-Detection. Try both on your own board photos and compare.",["pcd","pd"])
a(C,"Schematic image vs PCB photo — what's the difference for CV?","schematic pcb difference","A schematic is a clean line drawing of symbols and wires, so symbol detection plus line tracing works well. A PCB photo has real parts, shadows, traces on several layers, and hidden vias, so it is much harder and often incomplete.",["i2s","cv"])
a(C,"What is a netlist?","netlist definition nets nodes","A text list of the components and the nets (electrical nodes) that each pin connects to. It is what simulators and layout tools consume.",["ngs","nl"])
a(C,"What is SPICE?","spice simulator simulation","SPICE is a circuit simulator family. You feed it a netlist with component values and models, and it computes voltages and currents (DC, AC, transient). ngspice is a free open-source version.",["ngs"])
a(C,"How do I simulate a netlist?","simulate ngspice run","Install ngspice, save the netlist as a .cir/.sp file with an analysis line (e.g. .tran or .op) and .end, then run: ngspice file.cir. See the ngspice manual for analysis commands.",["ngs"])
a(C,"What does a SPICE resistor line look like?","spice syntax resistor line","Format: R<name> <node1> <node2> <value>, e.g. R1 in out 10k. Capacitors start with C, inductors with L, diodes with D, voltage sources with V.",["ngs"])
a(C,"What is node 0 in SPICE?","ground node 0 gnd","Node 0 is ground, the reference for every voltage. Every SPICE circuit needs a path to node 0.",["ngs"])
a(C,"What is a .model statement?","model spice diode transistor","It defines parameters for semiconductor devices (diodes, transistors), e.g. .model D1N4148 D(...). Without a correct model, simulation of active parts is not meaningful.",["ngs"])
a(C,"What is a BOM?","bill of materials bom","Bill of Materials: the list of part types, values, packages, and quantities. Detected components can be grouped into a BOM after CV.",["cv"])
a(C,"What are reference designators?","designator r1 c1 u1 annotation","Labels like R1, C3, U2, Q1, D4. The letter tells the part type: R resistor, C capacitor, L inductor, D diode, Q transistor, U IC, J connector, Y crystal, F fuse.",["cv"])
a(C,"How do I identify a resistor?","resistor identify color bands","Through-hole resistors are small cylinders with color bands; SMD resistors are small black rectangles with a printed number code (e.g. 103 = 10k). Schematic symbol: zigzag or rectangle. Designator R.",["pcd"])
a(C,"How do I read SMD resistor codes?","smd code 103 472","Three-digit code: two digits then the multiplier power of ten. 103 = 10 x 10^3 = 10 kΩ; 472 = 4.7 kΩ. An R marks the decimal point (4R7 = 4.7 Ω).",["pcd"])
a(C,"How do I identify a capacitor?","capacitor identify electrolytic ceramic","Ceramic SMD caps are tan/brown rectangles usually with no marking; electrolytics are cylinders with a stripe marking the negative lead. Symbol: two parallel plates (one curved for polarized). Designator C.",["pcd"])
a(C,"How do I tell diode polarity?","diode polarity cathode stripe","The band/stripe marks the cathode. In the symbol, the bar is the cathode and the triangle points toward it (direction of conventional current).",["pcd"])
a(C,"How do I identify an IC?","ic chip package u","ICs are black packages with many pins (SOIC, QFP, QFN, BGA). A dot or notch marks pin 1. Designator U. Read the part number on top and look up the datasheet.",["pcd"])
a(C,"How do I find pin 1 on a chip?","pin 1 dot notch","Look for a dot, dimple, notch, or beveled edge; pin 1 is next to it, and pins count counter-clockwise from the top view on most packages.",["pcd"])
a(C,"How do I identify an inductor?","inductor coil identify","Often a coil of wire, or a block marked with a code; power inductors are larger dark squares. Symbol: a series of loops. Designator L.",["pcd"])
a(C,"How do I identify a transistor?","transistor mosfet bjt package","Three-terminal parts in TO-92, SOT-23, or TO-220 packages. Designator Q. Check the printed code against the datasheet to know the pinout.",["pcd"])
a(C,"How should I photograph a board for circuit vision?","photo capture lighting camera","Use even diffuse lighting, keep the camera parallel to the board, fill the frame, focus on markings, shoot both sides, and keep original full-resolution files. See the Photo checklist on the Circuit Vision page.",["i2s","pcd"])
a(C,"Why is glare a problem in PCB photos?","glare reflection lighting","Glare washes out markings and makes shiny solder look like other features, which hurts detection and OCR. Use diffuse light or a polarizer and avoid direct flash.",["pcd"])
a(C,"What resolution should board photos be?","resolution megapixel quality","Use the highest resolution you can and avoid compression. Small SMD markings need many pixels; tile and stitch large boards rather than shrinking them.",["pcd"])
a(C,"What is YOLO?","yolo object detection ultralytics","YOLO is a fast object detection model family. In circuit vision it locates components with bounding boxes. Ultralytics documents training on custom datasets.",["yolo"])
a(C,"How do I train YOLO on my own components?","train custom dataset yolo labels","Label images with boxes per class (resistor, capacitor, ...), arrange them in YOLO format with a data YAML, then train with the Ultralytics CLI or Python API. Follow the Ultralytics training guide.",["yolo"])
a(C,"How many images do I need to train a detector?","dataset size images training","There's no fixed number; more varied labeled images help. Start with a pretrained model and fine-tune; check validation mAP to see if you need more data.",["yolo"])
a(C,"What is mAP?","map metric precision recall","Mean Average Precision: the standard detection accuracy metric combining precision and recall across classes and IoU thresholds. Higher is better.",["yolo"])
a(C,"What is SAM (Segment Anything)?","sam segment anything segmentation mask","Meta's Segment Anything Model produces pixel masks for objects from prompts like points or boxes. It can outline parts or traces, but it does not know component classes by itself.",["sam"])
a(C,"Detection vs segmentation — which do I need?","detection segmentation difference","Detection gives boxes + labels (good for counting/identifying parts). Segmentation gives exact pixel outlines (good for traces, pads, precise shapes). Many pipelines combine both.",["yolo","sam"])
a(C,"How do I read part markings with OCR?","ocr text markings easyocr","Crop each detected component and run OCR (e.g. EasyOCR) on it. Tiny laser-etched text often needs upscaling, contrast enhancement, and manual checking.",["ocr"])
a(C,"Why does OCR fail on chip markings?","ocr fail low contrast","Markings are small, low-contrast, and often rotated. Improve lighting, crop tightly, rotate upright, upscale, and verify manually.",["ocr"])
a(C,"How are wires/connections found in a schematic image?","wire line tracing connections","Pipelines remove detected symbols, then trace remaining lines (e.g. with thresholding and line/contour detection) and find junctions to group pins into nets.",["i2s","nl"])
a(C,"Can circuit vision recover connections from a PCB photo?","pcb traces connections multilayer","Only partially. Top-layer traces are visible, but inner layers and vias under parts are hidden. Expect to verify with a multimeter continuity check or the design files.",["i2s"])
a(C,"How do I verify a CV-generated netlist?","verify netlist check","Compare against the schematic or design files, spot-check nets with a continuity meter, check that every part has the expected pin count, and simulate a simple case.",["ngs","nl"])
a(C,"Which tool should I use for a quick demo?","demo quick tool choice","CircuitVision (Streamlit) is the fastest way to show image → parts → netlist.",["cv"])
a(C,"Which tool for SPICE-ready output?","spice output tool choice","Netlistify targets schematic-to-netlist conversion for simulation.",["nl"])
a(C,"How do I run a Streamlit app?","streamlit run python","Install requirements (pip install -r requirements.txt), then run: streamlit run <app file>.py and open the local URL it prints. Check the repo README for the exact file name.",["cv"])
a(C,"What is a Python virtual environment and why use one?","venv virtualenv python setup","A venv isolates a project's packages: python -m venv .venv, then activate it and pip install. It avoids version conflicts between repos.",["cv"])
a(C,"Do I need a GPU?","gpu cuda hardware","Inference on a few images works on CPU. Training detectors is much faster with an NVIDIA GPU; cloud notebooks are an option.",["yolo"])
a(C,"What is image preprocessing?","preprocessing grayscale threshold","Steps like resizing, grayscale, denoising, contrast adjustment, thresholding, and perspective correction that make images easier for models.",["i2s"])
a(C,"How do I fix a tilted photo?","perspective warp correction homography","Apply a perspective transform (homography) using the four board corners, e.g. with OpenCV getPerspectiveTransform + warpPerspective.",["i2s"])
a(C,"What is a footprint vs symbol?","footprint symbol layout","A symbol is the schematic drawing; a footprint is the physical copper pad pattern on the PCB. The same part has both.",["cv"])
a(C,"What is a via?","via pcb layer","A plated hole connecting copper layers. Vias hide connections between layers, which limits photo-based reconstruction.",["i2s"])
a(C,"What should I include in a CV handoff?","handoff documentation deliverable","Original images, board name/revision, which side is which, the detected component list with confidence, open questions, and any manual corrections.",["cv"])
a(C,"What is labeling/annotation for training?","label annotation dataset","Drawing boxes or masks on images and assigning class names so a model can learn. Consistent class definitions matter more than tools.",["yolo"])
a(C,"How do I measure if a model is good enough?","evaluate validation accuracy","Hold out a test set of your real boards, check precision/recall per class, and review false detections visually.",["yolo"])
a(C,"What is a confidence threshold?","confidence threshold detection","Detections below the threshold are discarded. Raise it for fewer false positives, lower it to miss fewer parts.",["yolo"])
# Network
a(N,"Where do I start learning network automation?","start beginner network automation","Begin with NetAutLabs for hands-on labs and CiscoDevNet/netprog_basics for fundamentals, then learn Netmiko, then labs-as-code with Containerlab or netlab.",["nal","npb","nm"])
a(N,"What is SSH?","ssh secure shell cli","Secure Shell: encrypted remote CLI access, normally TCP port 22. It's the main way to log into network devices and what Netmiko uses.",["nm"])
a(N,"How do I enable SSH on a Cisco IOS device?","enable ssh cisco ios crypto key","Typical steps: set hostname and ip domain-name, crypto key generate rsa (2048 bits), ip ssh version 2, create a local user, then on line vty 0 4 set transport input ssh and login local. Check your platform's guide.",["devnet"])
a(N,"Why can't I SSH to a device?","ssh fail timeout refused troubleshoot","Check reachability (ping), that port 22 is open/ACLs allow you, SSH is enabled with keys generated, vty lines allow ssh, and credentials are correct. 'Connection refused' usually means SSH not enabled; timeout usually means path/firewall.",["nm"])
a(N,"What is Netmiko?","netmiko python ssh library","A Python library by Kirk Byers that simplifies SSH to many network vendors: connect, send show commands, push config, save.",["nm","nmgh"])
a(N,"How do I install Netmiko?","install netmiko pip","pip install netmiko (ideally inside a virtual environment).",["nm"])
a(N,"How do I run a show command with Netmiko?","netmiko send_command show","Create ConnectHandler(**device) with device_type, host, username, password, then output = conn.send_command('show ip interface brief').",["nm"])
a(N,"How do I push config with Netmiko?","netmiko send_config_set config","Use conn.send_config_set([list of commands]); it enters and exits config mode for you. Then conn.save_config() if needed.",["nm"])
a(N,"What device_type should I use in Netmiko?","device_type platform vendor","It matches the platform, e.g. cisco_ios, cisco_nxos, cisco_xr, arista_eos, juniper_junos. The Netmiko docs/repo list supported platforms.",["nm","nmgh"])
a(N,"How do I get structured output from Netmiko?","textfsm parse structured use_textfsm","Pass use_textfsm=True to send_command to parse output into Python data using TextFSM/ntc-templates when a template exists.",["nm"])
a(N,"Netmiko times out — what do I do?","netmiko timeout read_timeout","Increase read_timeout on send_command for slow commands, check the prompt is detected, and confirm the device_type is correct.",["nm"])
a(N,"How do I keep passwords out of scripts?","credentials secrets password env","Read them from environment variables, getpass, or a vault (e.g. Ansible Vault). Never commit them to Git.",["nm","ans"])
a(N,"What is a VLAN?","vlan definition layer 2","A Virtual LAN splits one switch into separate Layer 2 broadcast domains, identified by a VLAN ID (1-4094).",["devnet"])
a(N,"How do I create a VLAN on Cisco IOS?","create vlan cisco","conf t, vlan 10, name USERS, then on an access port: interface Gi0/1, switchport mode access, switchport access vlan 10.",["devnet"])
a(N,"What is a trunk port?","trunk 802.1q tagging","A link that carries multiple VLANs using 802.1Q tags, typically between switches or to a router/firewall.",["devnet"])
a(N,"Access port vs trunk port?","access trunk difference","An access port carries one untagged VLAN for an end device; a trunk carries several tagged VLANs between network devices.",["devnet"])
a(N,"Devices in the same VLAN can't talk — why?","vlan troubleshoot connectivity not working broken cannot talk ping fail","Check both ports are in the same VLAN, the VLAN exists, the trunk allows it, the ports are up, and IP addresses are in the same subnet.",["devnet"])
a(N,"What is routing?","routing layer 3 basics","Forwarding packets between different IP networks based on a routing table. Routes come from connected interfaces, static config, or dynamic protocols like OSPF and BGP.",["devnet"])
a(N,"How do I add a static route?","static route ip route","Cisco IOS: ip route <destination> <mask> <next-hop>, e.g. ip route 10.2.0.0 255.255.0.0 192.168.1.1.",["devnet"])
a(N,"What is a default route?","default route 0.0.0.0","A route matching everything not otherwise known: ip route 0.0.0.0 0.0.0.0 <next-hop>. Commonly points to the internet edge.",["devnet"])
a(N,"What is OSPF?","ospf dynamic routing igp","A link-state interior routing protocol: routers share link info within areas and compute shortest paths. Common in enterprise networks.",["devnet","netlab"])
a(N,"What is BGP?","bgp border gateway","Border Gateway Protocol exchanges routes between autonomous systems (internet, data centers). It's policy-driven and runs over TCP 179.",["netlab"])
a(N,"How do I check the routing table?","show ip route routing table","Cisco: show ip route. Look for the route to your destination and its next hop.",["devnet"])
a(N,"What is a subnet mask?","subnet mask cidr","It splits an IP into network and host parts. /24 = 255.255.255.0 = 256 addresses (254 usable hosts).",["devnet"])
a(N,"How do I troubleshoot connectivity step by step?","troubleshoot ping traceroute layers","Go bottom up: link/interface up? correct VLAN? IP/mask/gateway right? ping gateway, then destination; traceroute to see where it stops; check ACLs and routes.",["devnet"])
a(N,"What does show ip interface brief tell me?","show ip interface brief status","Each interface's IP and its status/protocol. up/up is healthy; administratively down means shutdown is configured; up/down often means a Layer 2 problem.",["devnet"])
a(N,"What is NETCONF?","netconf xml yang rpc","An IETF protocol (RFC 6241) to read/change config using XML RPCs, usually over SSH port 830. Supports candidate configs and commit on capable devices.",["nc","devnet"])
a(N,"What is RESTCONF?","restconf rest http yang","An HTTP-based protocol (RFC 8040) to access YANG-modeled data with GET/PUT/PATCH/POST/DELETE, using JSON or XML.",["rc","devnet"])
a(N,"What is YANG?","yang data model","A data modeling language describing device configuration and state. NETCONF and RESTCONF use YANG models.",["nc","rc"])
a(N,"NETCONF vs RESTCONF — which should I use?","netconf restconf compare","NETCONF has richer transactions (candidate datastore, locking); RESTCONF is simpler for web/REST tooling. Use what your platform supports and your tools prefer.",["nc","rc"])
a(N,"NETCONF/RESTCONF vs CLI scraping?","api vs cli screen scraping","APIs return structured data and validate changes; CLI scraping (Netmiko) works everywhere but needs output parsing. Many teams use both.",["nc","nm"])
a(N,"What is Ansible?","ansible playbook agentless","An agentless automation tool. You write YAML playbooks that run tasks against an inventory of hosts; for network devices it connects via SSH/APIs.",["ans"])
a(N,"How do I configure Cisco devices with Ansible?","ansible cisco ios collection","Use the cisco.ios collection (e.g. cisco.ios.ios_config, ios_vlans) with ansible_connection: ansible.netcommon.network_cli and ansible_network_os: cisco.ios.ios.",["ansios"])
a(N,"What is an Ansible inventory?","inventory hosts groups","A file listing hosts and groups (INI or YAML) plus variables like connection type and OS.",["ans"])
a(N,"What is an Ansible role?","role structure reuse","A reusable bundle of tasks, templates, variables, and handlers with a standard folder layout, so playbooks stay short.",["ans"])
a(N,"How do I do a dry run in Ansible?","check mode dry run diff","Run ansible-playbook with --check (and --diff to see changes). Not every module supports check mode.",["ans"])
a(N,"What is Ansible Vault?","vault encrypt secrets","It encrypts sensitive variables/files: ansible-vault create secrets.yml; run playbooks with --ask-vault-pass.",["ans"])
a(N,"What is Nornir?","nornir python framework","A Python automation framework: inventory plus concurrent task execution, using plugins like Netmiko or NAPALM. It's Ansible-like but pure Python.",["nor"])
a(N,"Nornir vs Ansible?","nornir ansible compare","Ansible uses YAML playbooks and is easy to share; Nornir is Python code, faster and more flexible for developers. Pick based on your team's skills.",["nor","ans"])
a(N,"What is NAPALM?","napalm multivendor getters","A Python library with a vendor-neutral API for getting facts and replacing/merging config, with compare_config and rollback on supported drivers.",["nap"])
a(N,"What is Containerlab?","containerlab lab docker topology","A tool to build network labs from a YAML topology file using container-based network OSs. clab deploy -t file.clab.yml starts it.",["clab"])
a(N,"How do I start a Containerlab topology?","containerlab deploy destroy","sudo containerlab deploy -t mylab.clab.yml; inspect with containerlab inspect; remove with containerlab destroy -t mylab.clab.yml.",["clab"])
a(N,"What is netlab?","netlab ipspace lab","A tool by ipSpace that builds labs from a high-level topology and also configures routing protocols for you, using Containerlab or libvirt as providers.",["netlab"])
a(N,"Containerlab vs netlab?","containerlab netlab compare","Containerlab deploys nodes and links; netlab sits on top, generating topology plus device configs (addressing, OSPF, BGP...). Use netlab for quick protocol labs.",["clab","netlab"])
a(N,"What is topology-as-code?","topology as code lab git","Describing your lab in a version-controlled file (YAML) so it can be rebuilt identically any time. Containerlab and netlab do this.",["clab","netlab"])
a(N,"Where can I practice on real Cisco gear for free?","sandbox practice cisco free","Cisco DevNet Sandboxes and Learning Labs provide free lab environments.",["devnet"])
a(N,"How do I back up a device config?","backup config running","Save show running-config to a dated file (Netmiko, Ansible, or a tool like Oxidized/RANCID), ideally committed to Git.",["nm","ans"])
a(N,"How do I roll back a bad change?","rollback revert config","Options: re-apply the backup, use configure replace (Cisco IOS archive), commit confirmed / rollback on Junos/IOS-XR, or NAPALM rollback. Plan the rollback before the change.",["nap"])
a(N,"What is commit confirmed?","commit confirmed rollback timer","On Junos/IOS-XR, a commit that rolls back automatically unless you confirm within a timer, protecting you from locking yourself out.",["nc"])
a(N,"What should a change checklist include?","change management checklist","Approval/window, backup, pre-checks, the exact commands, lab test, post-checks, rollback plan, and ticket notes. See the Config change checklist on the Networks page.",["nal"])
a(N,"Running-config vs startup-config?","running startup save","running-config is live in memory; startup-config loads at boot. Save with copy running-config startup-config (or write memory) or changes are lost on reload.",["devnet"])
a(N,"How do I avoid locking myself out?","lockout safe change","Use commit confirmed or 'reload in 10' before risky changes, keep console/out-of-band access, and apply ACLs carefully.",["devnet"])
a(N,"How do I store configs in Git?","git version control configs","Back up configs to a repo on a schedule, commit with timestamps, and use diffs to see what changed.",["awe"])
a(N,"What is idempotency?","idempotent automation","Running the same automation twice gives the same result without extra changes. Ansible resource modules aim for this.",["ans"])
a(N,"What is Jinja2 templating?","jinja2 template config generation","A template language used to generate configs from variables, e.g. {{ hostname }}. Ansible and many Python tools use it.",["ans"])
a(N,"What is TextFSM?","textfsm parsing","A template-based parser that turns CLI output into tables; ntc-templates provides many ready-made templates.",["nm"])
a(N,"Where can I find more network automation tools?","tools list resources","The networktocode awesome-network-automation list collects tools, books, and communities.",["awe"])
a(N,"What is SNMP?","snmp monitoring","Simple Network Management Protocol polls device counters/status and sends traps. Use SNMPv3 for authentication and encryption.",["awe"])
a(N,"What is streaming telemetry / gNMI?","gnmi telemetry streaming","Devices push structured data continuously (often via gNMI over gRPC) instead of being polled, for faster monitoring.",["awe"])
a(N,"What is an ACL?","acl access control list","An ordered list of permit/deny rules on packets. It ends with an implicit deny, so order and a final permit matter.",["devnet"])
a(N,"How do I test automation safely?","test lab safe","Run against a Containerlab/netlab copy or a DevNet sandbox first, use check/dry-run modes, then a small pilot group.",["clab","devnet"])
a(N,"What is Python's role in network automation?","python learn","Python drives most libraries (Netmiko, NAPALM, Nornir). Learn basics: variables, lists/dicts, loops, functions, files, and JSON.",["npb"])
a(N,"How do I call a REST API from Python?","requests python api","Use the requests library: requests.get(url, auth=..., headers={'Accept':'application/yang-data+json'}, verify=...). Check status_code then .json().",["rc","npb"])
a(N,"What port does NETCONF use?","netconf port 830","NETCONF over SSH uses TCP port 830 by default.",["nc"])

# ---- Networking additions ----
a(N,"How do I calculate a subnet?","subnet calculate cidr network broadcast hosts","Use the Toolkit subnet calculator. By hand: hosts = 2^(32-prefix) - 2; the network address is the IP AND the mask; broadcast is the network with all host bits set. Example 192.168.10.37/27: network .32, broadcast .63, hosts .33-.62.",["tk","r4632"])
a(N,"What is CIDR notation?","cidr prefix slash notation","CIDR writes the mask as a prefix length: /24 = 255.255.255.0, /27 = 255.255.255.224. It replaced classful addressing and allows route summarization.",["r4632"])
a(N,"How many hosts are in a /27, /28, /29, /30?","hosts per prefix 27 28 29 30","/27 = 30 usable, /28 = 14, /29 = 6, /30 = 2. Usable = 2^(32-prefix) minus network and broadcast.",["tk"])
a(N,"Can I use /31 on point-to-point links?","31 point to point link","Yes. RFC 3021 allows /31 on point-to-point links: both addresses are usable, saving addresses versus /30. Most modern routers support it.",["r3021"])
a(N,"What are the private IP ranges?","private rfc1918 ranges 10 172 192","10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 (RFC 1918). They are not routed on the Internet and need NAT for Internet access.",["r1918"])
a(N,"What is a wildcard mask?","wildcard mask acl ospf inverse","The inverse of a subnet mask, used in Cisco ACLs and OSPF network statements: 0 bits must match, 1 bits are ignored. /24 mask 255.255.255.0 = wildcard 0.0.0.255.",["tk"])
a(N,"What is route summarization?","summarization aggregate supernet","Advertising one shorter prefix that covers several longer ones, e.g. 10.1.0.0/22 covers 10.1.0.0-10.1.3.255. Reduces routing table size and churn.",["r4632"])
a(N,"How do I troubleshoot an OSPF neighbor that won't come up?","ospf neighbor down adjacency stuck","Check IP reachability, OSPF enabled on the interface (not passive), and matching area, subnet, hello/dead timers, authentication, area type and MTU. Stuck in EXSTART/EXCHANGE usually means MTU mismatch. See the OSPF flowchart.",["tk","r2328"])
a(N,"What do OSPF neighbor states mean?","ospf states full 2way exstart init","Down → Init (hello seen) → 2-Way (bidirectional; normal final state between DROTHERs) → ExStart/Exchange (database description) → Loading → Full (synchronized).",["r2328"])
a(N,"What is an OSPF DR/BDR?","ospf dr bdr designated router","On broadcast networks OSPF elects a Designated Router and Backup to reduce adjacencies. Highest priority wins, then highest router ID. Priority 0 = never DR.",["r2328"])
a(N,"How do I troubleshoot a BGP session that is down?","bgp down idle active session","Check the state: Idle (config or no route to peer), Active (TCP 179 failing). Verify reachability from the update-source, remote-as, password, ebgp-multihop for loopbacks, and ACLs/firewalls on TCP 179. See the BGP flowchart.",["tk","r4271"])
a(N,"What do BGP Idle and Active states mean?","bgp idle active state","Idle: not attempting (admin shut, no route, or after error). Active: trying to open the TCP session but failing. Established is the working state.",["r4271"])
a(N,"Why isn't my BGP route in the routing table?","bgp route not installed next hop","Usually the next hop is unreachable (common on iBGP — use next-hop-self), it isn't the best path, or a route with lower administrative distance wins.",["tk","r4271"])
a(N,"eBGP vs iBGP?","ebgp ibgp difference","eBGP peers are in different ASes (usually directly connected, TTL 1); iBGP peers are in the same AS, don't change next hop by default, and don't re-advertise iBGP routes to other iBGP peers (needs full mesh or route reflectors).",["r4271"])
a(N,"How does BGP choose the best path?","bgp best path selection attributes","Simplified Cisco order: highest weight, highest local preference, locally originated, shortest AS path, lowest origin type, lowest MED, eBGP over iBGP, lowest IGP metric to next hop, then tie-breakers (oldest, lowest router ID).",["r4271"])
a(N,"What is administrative distance?","administrative distance ad route preference","Cisco's trust ranking between routing sources: connected 0, static 1, eBGP 20, OSPF 110, IS-IS 115, RIP 120, iBGP 200. Lower wins when the same prefix comes from different sources.",["devnet"])
a(N,"How do I check trunk ports on Cisco?","show interfaces trunk allowed vlans","show interfaces trunk (IOS) or show interface trunk (NX-OS) lists trunk ports, native VLAN, and VLANs allowed and active. Check both ends match.",["tk"])
a(N,"How do I safely add a VLAN to a trunk?","add vlan trunk allowed add","Use switchport trunk allowed vlan add <id>. Without 'add' the command replaces the whole allowed list and can cause an outage.",["tk"])
a(N,"What is a native VLAN mismatch?","native vlan mismatch cdp","The two ends of a trunk use different untagged (native) VLANs, so untagged traffic leaks between VLANs. CDP logs NATIVE_VLAN_MISMATCH. Set the same native VLAN on both sides.",["tk"])
a(N,"What is spanning tree?","stp spanning tree loop","A protocol that blocks redundant switch links to prevent Layer 2 loops. Check root bridge and port states with show spanning-tree; Rapid PVST+ or MST are common.",["tk"])
a(N,"Why is my port err-disabled?","err-disabled errdisable port security bpdu guard","A protection feature shut it: port security violation, BPDU guard, UDLD, link flap, etc. Check show interfaces status err-disabled and logs, fix the cause, then shutdown/no shutdown.",["tk"])
a(N,"What is an EtherChannel / LAG?","etherchannel lag lacp port-channel","Several physical links bundled into one logical link for bandwidth and redundancy. LACP (802.3ad) negotiates it; use active/active or active/passive, not 'on' with LACP.",["tk"])
a(N,"How do I check interface errors?","interface errors crc input counters","show interfaces <if> (IOS/NX-OS) or show interfaces <if> extensive (Junos). Rising CRC/input errors suggest bad cable/optic or duplex mismatch; clear counters and watch.",["tk"])
a(N,"What is a duplex mismatch?","duplex mismatch late collisions","One side full duplex, the other half — causes slow, errored links (late collisions, CRC errors). Use auto/auto on both or hardcode both the same.",["tk"])
a(N,"What is an SVI?","svi vlan interface layer 3","A Switch Virtual Interface (interface VlanX) gives a VLAN an IP address for routing/management. It is up only if the VLAN exists and has an active port.",["tk"])
a(N,"How do I route between VLANs on a Layer 3 switch?","inter-vlan routing ip routing svi","Create SVIs for each VLAN with gateway IPs and enable ip routing. Hosts use the SVI IP as their default gateway.",["tk"])
a(N,"What are the most useful Cisco show commands?","cisco show commands ios cheat sheet","show ip interface brief, show interfaces status, show vlan brief, show interfaces trunk, show ip route, show ip ospf neighbor, show ip bgp summary, show cdp/lldp neighbors, show logging. See the Toolkit cheat sheet.",["tk"])
a(N,"What are common Juniper Junos show commands?","juniper junos show commands","show interfaces terse, show route, show ospf neighbor, show bgp summary, show lldp neighbors, show ethernet-switching table, show log messages, show configuration | display set.",["tk","jdoc"])
a(N,"How do I commit safely on Junos?","junos commit confirmed rollback compare","Review with show | compare, validate with commit check, then commit confirmed <minutes>; if you lose access it rolls back automatically. Confirm with a plain commit. rollback 1 restores the previous config.",["tk","jdoc"])
a(N,"NX-OS vs IOS differences to know?","nx-os nexus ios differences feature","NX-OS needs features enabled (feature ospf, feature bgp, feature interface-vlan), uses Ethernet1/1 naming, VRF-aware commands (vrf all), checkpoints/rollback, and vPC for multi-chassis port-channels.",["tk"])
a(N,"What is vPC?","vpc nexus virtual port channel","Cisco Nexus virtual Port Channel: two switches present one port-channel to a downstream device. Check with show vpc brief; peer-link and keepalive must be healthy.",["tk"])
a(N,"How do I use reload in as a safety net?","reload in safety net lockout cisco","Before a risky remote change on IOS, run reload in 10. If you lose access the device reboots to the saved config. If all is good, run reload cancel and save.",["tk"])
a(N,"What should I capture before and after a change?","pre post checks change verification","Interfaces, routing table/prefix counts, OSPF/BGP neighbors, STP/trunks/port-channels, key pings/traceroutes, and logs. Re-run after and diff. Use the Toolkit pre/post checklist.",["tk"])
a(N,"How do I read a traceroute?","traceroute read hops asterisks","Each line is a hop with round-trip times. Asterisks mean that hop didn't reply (often ICMP rate-limiting, not necessarily loss). Look where latency jumps and stays high, or where it stops completely.",["tk"])
a(N,"What is MTU and why does it matter?","mtu fragmentation jumbo","Maximum packet size on a link (1500 bytes typical Ethernet). Mismatches break OSPF adjacencies and cause drops for large packets, especially over tunnels/QinQ; carriers may require larger MTU.",["tk"])
a(N,"What is NAT?","nat pat translation","Network Address Translation rewrites IP addresses, usually private to public. PAT (overload) shares one public IP across many hosts using ports.",["r1918"])
a(N,"What is HSRP/VRRP?","hsrp vrrp gateway redundancy fhrp","First-hop redundancy protocols: two routers share a virtual gateway IP so hosts keep working if one fails. HSRP is Cisco; VRRP is a standard.",["tk"])
a(N,"What is LLDP/CDP used for?","lldp cdp neighbors discovery","Discovering directly connected neighbors: device name, port, platform. Great for verifying cabling and documentation. show cdp neighbors detail / show lldp neighbors.",["tk"])
a(N,"What is a VRF?","vrf routing instance","A separate routing table on one router, keeping traffic of different customers or services isolated. Used heavily in MPLS L3VPN.",["r4364"])
a(N,"How do I check logs on network devices?","logs syslog show logging","IOS: show logging; NX-OS: show logging logfile; Junos: show log messages. Send logs to a central syslog server with correct time (NTP) so events line up.",["tk"])
a(N,"Why is NTP important?","ntp time sync logs","Accurate time makes logs and tickets correlate across devices and carriers; also needed for certificates and some authentication.",["tk"])

# ---- Circuits, carriers & OSS ----
a(O,"What is a circuit ID?","circuit id cid identifier","The unique ID for a circuit used on orders, tickets and invoices. Carriers have their own formats (many US carriers use Telcordia CLCI-based ones); your inventory system may also have an internal ID. Always quote it on tickets. See the Circuit ID explainer.",["oss","nbcm"])
a(O,"How do I read a circuit ID?","read decode circuit id format segments","Split it into segments: commonly a location or prefix, service type code, bandwidth or modifier, serial number, and carrier/company code. Exact meaning depends on the carrier — check their documentation.",["oss"])
a(O,"What is a demarc?","demarc demarcation point","The point where the carrier's responsibility ends and yours begins, usually a NID port or patch panel. Problems on your side of the demarc are yours to fix.",["oss"])
a(O,"What is a NID?","nid network interface device","A carrier-owned device at the demarc. For Ethernet it's often a small managed switch that supports loopbacks and performance tests the carrier can run remotely.",["oss","mef"])
a(O,"What is an extended demarc?","extended demarc inside wiring","Cabling from the carrier's demarc to your equipment room or rack. Clarify who orders and owns it — it's a common cause of turn-up delays.",["oss"])
a(O,"What is an LOA?","loa letter of authorization","Letter of Authorization: lets another party (e.g. a carrier) order a connection to your space or port. Usually expires (often 30-90 days).",["oss"])
a(O,"What is a CFA?","cfa connecting facility assignment loa-cfa","Connecting Facility Assignment: the exact location (panel and port) where a circuit or cross-connect lands. Often combined as an LOA-CFA document.",["oss"])
a(O,"How do I order a cross-connect?","cross-connect order data center colo","Get the LOA-CFA from the other party, check panel/port and media, order the cross-connect from the data center operator quoting it, configure your port, then verify light/link and label both ends. Use the LOA/CFA checklist.",["oss"])
a(O,"What is a meet-me room?","meet-me room mmr colocation","The room in a data center or carrier hotel where carriers and customers interconnect with cross-connects.",["oss"])
a(O,"What is DIA?","dia dedicated internet access","Dedicated Internet Access: Internet with committed bandwidth, an SLA and usually a static IP block; routing via static or BGP. Different from shared broadband.",["oss"])
a(O,"DIA vs broadband?","dia broadband difference","DIA has dedicated bandwidth, symmetrical speeds, SLAs and static IPs; broadband is shared, often asymmetrical and best effort but much cheaper.",["oss"])
a(O,"What is MPLS L3VPN?","mpls l3vpn vpn carrier wan","A carrier-managed private routed WAN. Each site connects CE to PE; the carrier keeps your routes in a VRF and routes between your sites (RFC 4364). Routing to the carrier is often BGP or static.",["r4364"])
a(O,"What is Metro Ethernet?","metro ethernet carrier ethernet","Layer 2 Ethernet services across a carrier network (MEF-defined): E-Line point-to-point, E-LAN multipoint, E-Tree rooted multipoint.",["mef"])
a(O,"What is E-Line, EPL and EVPL?","eline epl evpl point to point","E-Line is point-to-point Ethernet. EPL is port-based (whole port, transparent). EVPL is VLAN-based, so one physical port can carry several EVCs to different sites.",["mef"])
a(O,"What is E-LAN?","elan multipoint ethernet","Multipoint-to-multipoint Ethernet: all connected sites behave like one switched LAN.",["mef"])
a(O,"What is an EVC?","evc ethernet virtual connection","Ethernet Virtual Connection: the MEF term for the logical connection between UNIs that carries the customer's service.",["mef"])
a(O,"What is a UNI and an NNI?","uni nni enni interface","UNI is the customer handoff port. NNI/ENNI is the interconnect between two carriers' networks (e.g. when a last-mile partner is used).",["mef"])
a(O,"What are CIR and EIR?","cir eir committed rate bandwidth profile","CIR is the committed, guaranteed rate; EIR is extra traffic allowed above CIR without guarantees. Traffic above CIR+EIR is dropped by the policer.",["mef","y1564"])
a(O,"What is QinQ?","qinq 802.1ad s-tag c-tag double tagging","VLAN stacking (802.1ad): the carrier adds an outer S-tag around customer C-tags so customer VLANs pass transparently. Watch MTU — each tag adds 4 bytes.",["mef"])
a(O,"What is a wavelength service?","wave wavelength dwdm optical","A dedicated optical channel on a carrier's DWDM system (e.g. 10G/100G), point-to-point and protocol transparent. Used for data center interconnect and backbones.",["oss"])
a(O,"What is dark fiber?","dark fiber unlit strands","Leased fiber strands with no carrier equipment; you supply optics/equipment. Maximum control and bandwidth, but you own operation and troubleshooting.",["oss"])
a(O,"What is a DS1 / T1?","ds1 t1 1.544","A 1.544 Mbps TDM circuit made of 24 × 64 kbps DS0 channels. Legacy, still found in voice/alarm circuits.",["oss"])
a(O,"What is a DS3 / T3?","ds3 t3 44.736","A 44.736 Mbps TDM circuit carrying 28 DS1s. Mostly replaced by Ethernet.",["oss"])
a(O,"What is OSS vs BSS?","oss bss operations business support systems","OSS (operations support) covers inventory, design, provisioning, fault and performance. BSS (business support) covers orders, billing and customer management.",["oss","cvp"])
a(O,"What does a network inventory system do?","inventory system oss purpose","It records equipment, ports, circuits, fiber, assignments and customers so you can design new services, find free capacity, and see what is impacted by an outage.",["cvn","nbc"])
a(O,"What is CircuitVision?","circuitvision oss suite","A telecom OSS software suite from CircuitVision: cvNetwork (network/circuit inventory, design and orders), cvFiber (outside-plant fiber GIS) and cvTicket (trouble/change ticketing). This site is not affiliated; see their product pages and your internal training.",["cvp"])
a(O,"What is cvNetwork?","cvnetwork inventory design order","Per CircuitVision's product page: network management and design — equipment inventory, circuit and service design, order management, engineering workflow, capacity and grooming.",["cvn"])
a(O,"What is cvFiber?","cvfiber osp gis fiber mapping","Per CircuitVision's product page: outside-plant fiber management with GIS mapping — cables, conduits, splices, patch panels, and strand-level circuit info to see impact.",["cvf"])
a(O,"What is cvTicket?","cvticket trouble ticket change management noc","Per CircuitVision's product page: trouble and change/maintenance ticketing for the NOC, linked to network data to see impacted circuits and bulk-notify customers.",["cvt"])
a(O,"What are the steps in a circuit's lifecycle?","circuit lifecycle steps order design turn-up","Quote → order → design in OSS → assignments → build/install → turn-up and testing → customer acceptance → billing → operate → change → disconnect. See the lifecycle flowchart.",["oss"])
a(O,"What is circuit design?","circuit design dlr path","Choosing and recording the end-to-end path: facilities, equipment, ports, fibers, VLANs and IPs, producing a design record (DLR) in the OSS.",["oss","cvn"])
a(O,"What is a DLR?","dlr design layout record","Design Layout Record: carrier document showing how a circuit is built end to end — useful when troubleshooting with the carrier.",["oss"])
a(O,"What are assignments in OSS?","assignments reserve ports vlan","Reserving specific resources (ports, fiber strands, VLANs, IP blocks, cross-connects) to a circuit so nobody else uses them. Released on disconnect.",["oss","cvn"])
a(O,"What is a FOC date?","foc firm order commitment","Firm Order Commitment: the date the carrier commits to deliver. Track it on the order and escalate if it slips.",["oss"])
a(O,"What tests are run at circuit turn-up?","turn-up testing tests","Physical/optic checks, loopbacks, then a service test at CIR — RFC 2544 or ITU-T Y.1564 — measuring throughput, latency, jitter and loss. Save results on the ticket. See the turn-up checklist.",["r2544","y1564"])
a(O,"What is RFC 2544?","rfc 2544 benchmark test","An IETF benchmarking methodology: throughput, latency, frame loss and back-to-back frames across frame sizes. Widely used (though designed for lab devices) for circuit turn-up.",["r2544"])
a(O,"What is ITU-T Y.1564?","y.1564 service activation test","Ethernet service activation methodology: a service configuration test (CIR, EIR, policing) and a service performance test over time checking delay, delay variation and loss. Can test multiple services at once.",["y1564"])
a(O,"RFC 2544 vs Y.1564?","2544 vs 1564 difference","RFC 2544 tests one stream sequentially and was designed for lab benchmarking; Y.1564 was designed for service activation, tests multiple services (CIR/EIR) at once and checks SLA KPIs.",["r2544","y1564"])
a(O,"What is a loopback test?","loopback test isolate fault","A device returns traffic to the sender so you can test one segment at a time. Carriers loop their NID; if the loop toward the carrier passes, the problem is likely on your side.",["oss"])
a(O,"What are typical optic light levels?","light levels dbm rx tx optics","Check Rx/Tx dBm against the transceiver's datasheet range. Too low = dirty/damaged fiber or long path; too high on short links can overload the receiver. Clean connectors first.",["oss"])
a(O,"How do I open a trouble ticket with a carrier?","carrier ticket trouble open","Have the circuit ID, A/Z locations, start time with time zone, impact, symptoms, what you already tested (light, errors, loopbacks), site access contact and testing authorization. Use the carrier ticket template.",["oss"])
a(O,"How do I escalate a carrier ticket?","escalate carrier ticket escalation","Ask for the ticket number and next update time, then use the carrier's escalation list (tier/time based). Keep a timeline of updates; reference SLA terms for hard-down circuits.",["oss"])
a(O,"What is an SLA for a circuit?","sla availability mttr credits","Service Level Agreement: commitments on availability, latency, jitter, loss and repair time, with credits if missed. Check how outages must be reported to qualify.",["oss"])
a(O,"What is MTTR?","mttr mean time to repair","Mean Time To Repair: average time to restore service after a failure. A key SLA and NOC metric.",["oss"])
a(O,"What is on-net vs off-net?","on-net off-net last mile","On-net: the carrier's own facilities reach the building. Off-net: they use another provider for the last mile (via an NNI), which usually adds cost and lead time.",["oss"])
a(O,"What is path diversity?","diversity diverse path redundancy","Two circuits that don't share building entrances, conduits, or carrier equipment, so one cut doesn't take both down. Ask for route maps and diversity guarantees in writing.",["oss"])
a(O,"What happens on a circuit disconnect?","disconnect circuit decommission","Submit the disconnect order, remove cross-connects/equipment, release assignments in inventory and confirm billing stops. Stale inventory and lingering billing are common problems.",["oss","cvn"])
a(O,"How do I trace a circuit in an inventory system?","trace circuit inventory netbox termination","Find the circuit by ID, check provider/type/status, open the A and Z terminations, follow cables to device interfaces, then check VLANs/IPs. Practise on the NetBox public demo.",["nbc","nbct","nbdemo"])
a(O,"How does NetBox model circuits?","netbox circuits provider termination model","Providers own circuits; each circuit has a type, ID (cid), status, commit rate, and A/Z terminations attached to sites or provider networks and cabled to device interfaces.",["nbc","nbcm","nbct"])
a(O,"What is a maintenance window notification?","maintenance window notification planned","A carrier or internal notice of planned work. Check which of your circuits are impacted (inventory), notify affected users, and confirm services after the window.",["cvt"])
a(O,"What is a cross-connect ID?","cross-connect id xconnect","The data center operator's reference for a cross-connect. Record it in inventory with both panel/port ends; you need it to troubleshoot or disconnect.",["oss"])
a(O,"What should I learn first in a circuits/OSS role?","start learning circuits oss first","Your company's circuit ID format, the order → design → turn-up flow, how to look up a circuit in the inventory/OSS, and how to open carrier tickets. Follow the 30-60-90 plan.",["oss"])

E=[e for e in E if e["track"]!="circuit"]
json.dump(E,open("kb.json","w"),ensure_ascii=False,indent=1)
print(len(E))
